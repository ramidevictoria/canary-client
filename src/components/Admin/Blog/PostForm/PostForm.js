import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  DatePicker,
  notification
} from "antd";
import { LinkOutlined, FontSizeOutlined } from '@ant-design/icons';
import moment from "moment";
import { Editor } from "@tinymce/tinymce-react";
import { getAccessTokenApi } from "../../../../api/auth";
import { addPostApi, updatePostApi } from "../../../../api/post";

import "./PostForm.scss";

export default function AddEditPostForm(props) {
  const { setIsVisibleModal, setReloadPosts, post } = props;
  const [postData, setPostData] = useState({});

  

  useEffect(() => {
    if (post) {
      setPostData(post);
    } else {
      setPostData({});
    }
  }, [post]);

  const processPost = () => {
    
    const { title, url, description, date } = postData;

    if (!title || !url || !description || !date) {
      notification["error"]({message: "Todos los campos son obligatorios."});
    } else {
      if (!post) {
        addPost();
      } else {
        updatePost();
      }
    }
  };

  const addPost = () => {
    const token = getAccessTokenApi();

    addPostApi(token, postData)
      .then(response => {
        
        notification['success']({message: response});
        setIsVisibleModal(false);
        setReloadPosts(true);
        setPostData({});
      })
      .catch((err) => {
        notification["error"]({message: err});
      });
  };

  const updatePost = () => {
    const token = getAccessTokenApi();
    updatePostApi(token, post._id, postData)
      .then(response => {
        notification['success']({message: response});
        setIsVisibleModal(false);
        setReloadPosts(true);
        setPostData({});
      })
      .catch((err) => {
        notification["error"]({message: err});
      });
  };

  return (
    <div className="post-form">
      <AddEditForm
        postData={postData}
        setPostData={setPostData}
        post={post}
        processPost={processPost}
      />
    </div>
  );
}

function AddEditForm(props) {
  const { postData, setPostData, post, processPost } = props;

  return (
    <Form className="post-form" layout="inline" onFinish={processPost}>
      <Row gutter={24}>
        <Col span={8}>
          <Input
            prefix={<FontSizeOutlined />}
            placeholder="Titulo"
            value={postData.title}
            onChange={e => setPostData({ ...postData, title: e.target.value })}
          />
        </Col>
        <Col span={8}>
          <Input
            prefix={<LinkOutlined />}
            placeholder="url"
            value={postData.url}
            onChange={e =>
              setPostData({
                ...postData,
                url: transformTextToUrl(e.target.value)
              })
            }
          />
        </Col>
        <Col span={8}>
          <DatePicker
            style={{ width: "100%" }}
            format="DD/MM/YYYY HH:mm:ss"
            placeholder="Fecha de publicación"
            value={postData.date && moment(postData.date)}
            onChange={(e, value) =>
              setPostData({
                ...postData,
                date: moment(value, "DD/MM/YYYY HH:mm:ss").toISOString()
              })
            }
          />
        </Col>
      </Row>

      <Editor
        initialValue={postData.description ? postData.description : ""}
        init={{
          height: 400,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount"
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help"
        }}
        onBlur={e =>
          setPostData({ ...postData, description: e.target.getContent() })
        }
      />

      <Button type="primary" htmlType="submit" className="btn-submit">
        {post ? "Actualizar post" : "Crear post"}
      </Button>
    </Form>
  );
}

function transformTextToUrl(text) {
  const url = text.replace(" ", "-");
  return url.toLowerCase();
}
