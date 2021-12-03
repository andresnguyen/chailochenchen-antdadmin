import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Switch, Upload, Select } from 'antd';
import React, { useState } from 'react';
import { API_URL, authStorageKeys, productCategoryList } from '../../../../constants';

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
};

function AddEditForm({ isEdit, onSubmit, initialValues }) {
  const [fileList, setFileList] = useState(initialValues.imageSrc ? [initialValues.imageSrc] : []);

  const handleFinish = (values) => {
    onSubmit?.(values);
  };

  const handleFieldsChange = (changedFields, allFields) => {
    console.log(changedFields, allFields);
  };

  const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <Form {...layout} initialValues={initialValues} onFinish={handleFinish} onFieldsChange={handleFieldsChange}>
      <Form.Item
        label="Tên sản phẩm"
        name="name"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập tên sản phẩm',
          },
        ]}
      >
        <Input placeholder="Nhập tên sản phẩm" />
      </Form.Item>
      <Form.Item
        name="category"
        label="Danh mục sản phẩm"
        hasFeedback
        rules={[{ required: true, message: 'Vui lòng chọn danh mục sản phẩm' }]}
      >
        <Select placeholder="Chọn danh mục sản phẩm">
          {productCategoryList.map((productCategory) => (
            <Option key={productCategory.category} value={productCategory.category}>
              {productCategory.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Nội dung" name="content">
        <Input.TextArea placeholder="Nhập nội dung" autoSize={{ minRows: 3, maxRows: 5 }} />
      </Form.Item>
      <Form.Item label="Link Shoppe" name="shoppeLink">
        <Input placeholder="Nhập link shoppe" />
      </Form.Item>
      <Form.Item label="Link Facebook" name="facebookLink">
        <Input placeholder="Nhập link facebook" />
      </Form.Item>
      <Form.Item label="Kích hoạt" name="isActive">
        <Switch />
      </Form.Item>

      <Form.Item
        name="imageSrc"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[
          {
            required: true,
            message: 'Vui lòng chọn hình ảnh',
          },
        ]}
      >
        <Upload
          onChange={onChange}
          name="file"
          action={`${API_URL}products/upload-image`}
          listType="picture-card"
          headers={{
            Authorization: 'Bearer ' + localStorage.getItem(authStorageKeys.TOKEN)
          }}
          onPreview={onPreview}
        >
          {fileList.length < 1 && (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {isEdit ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
        </Button>
      </Form.Item>
    </Form>
  );
}

AddEditForm.propTypes = {};

export default AddEditForm;
