import React, { Component } from "react";
import {
  Upload,
  Icon,
  Modal,
  message,
  Form,
  DatePicker,
  InputNumber,
  Button,
  Card
} from "antd";
import axios from "axios";
import "./style.css";
import moment from "moment";
class Home extends Component {
  state = {
    previewVisible: false,
    previewImage: "",
    fileList: []
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
  };

  uploadImageFile = option => {
    const { file, onProgress, onSuccess, onError } = option;
    var bodyFormData = new FormData();
    bodyFormData.append("image", file);
    axios({
      method: "post",
      url: "/api/uploadImage",
      data: bodyFormData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
      onUploadProgress: e => {
        onProgress({ percent: (e.loaded / e.total) * 100 - 10 });
      }
    })
      .then(response => {
        if (response.status === 200) {
          message.success("Image Uploaded Successfully");
          onSuccess();
        } else {
          onProgress({ percent: 100 });
          onError("Upload failed");
        }
      })
      .catch(response => {
        message.error("Something went wrong!" + response);
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var bodyFormData = new FormData();
        bodyFormData.append("image", JSON.stringify(values.upload.fileList));
        bodyFormData.append("amount", values.amount);
        bodyFormData.append(
          "date",
          moment(values.date_picker._d).format("YYYY-MM-DD HH:mm:ss")
        );

        axios({
          method: "post",
          url: "/api/create_data",
          data: {
            amount: values.amount,
            date: moment(values.date_picker._d).format("YYYY-MM-DD HH:mm:ss")
          }
        })
          .then(res => {
            window.location.replace("/display");
          })
          .catch(err => {
            message.error(err);
          });
      }
    });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="clearfix">
        <Card title="Data Form">
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="Enter Amount">
              {getFieldDecorator("amount", {
                rules: [
                  {
                    required: true,
                    message: "Please Enter Number!"
                  }
                ]
              })(<InputNumber />)}
            </Form.Item>
            <Form.Item label="Enter Date">
              {getFieldDecorator("date_picker", {
                rules: [
                  {
                    type: "object",
                    required: true,
                    message: "Please select Date!"
                  }
                ]
              })(<DatePicker />)}
            </Form.Item>

            <Form.Item label="Upload Image">
              {getFieldDecorator("upload", {
                rules: [
                  {
                    required: true,
                    message: "Please select Image!"
                  }
                ]
              })(
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  multiple={true}
                  onChange={this.handleChange}
                  customRequest={this.uploadImageFile}
                  accept=".png,.jpeg,.jpg"
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
              )}
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>

          <Modal
            visible={previewVisible}
            footer={null}
            onCancel={this.handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </Card>
      </div>
    );
  }
}

const HomePage = Form.create({ name: "Home" })(Home);
export default HomePage;
