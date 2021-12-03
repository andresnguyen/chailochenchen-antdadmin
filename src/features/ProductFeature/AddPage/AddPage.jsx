import { message } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';
import productAPI from '../../../api/productAPI';
import AddEditForm from '../components/AddEditForm/AddEditForm';

function AddPage(props) {
  const history = useHistory();
  const initialValues = {
    name: undefined,
    imageSrc: undefined,
    category: undefined,
    content: undefined,
    isActive: undefined,
  };

  const handleSubmit = async (values) => {
    const valuesCopy = { ...values };
    valuesCopy.imageSrc = valuesCopy?.imageSrc[0]?.response?.data.path;

    try {
      const product = await productAPI.add(valuesCopy);
      message.success('Thêm sản phẩm thành công', 3);
    } catch (error) {
      message.error('Thêm sản phẩm thất bại', 3);
    }
    history.push('/products');
  };

  return <AddEditForm initialValues={initialValues} onSubmit={handleSubmit} />;
}

AddPage.propTypes = {};

export default AddPage;
