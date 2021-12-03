import { Upload, Modal, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default class UploadFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
    };
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = ({ fileList }) => {
    this.props.setFileList(fileList);
  };

  render() {
    const { previewVisible, previewImage, previewTitle } = this.state;
    const { fileList, setFileList } = this.props;
    console.log({ fileList });
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <Form.Item label="Hình ảnh" name="imageSrc" valuePropName="fileList" getValueFromEvent={this.props.normFile}>
        <Upload
          action="http://localhost:3002/products/upload-image"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          valuePropName="fileList" 
          getValueFromEvent={this.props.normFile}
          name="file"
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Form.Item>
    );
  }
}
