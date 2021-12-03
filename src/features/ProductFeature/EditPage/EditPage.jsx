import { message, Spin } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import productAPI from '../../../api/productAPI';
import AddEditForm from '../components/AddEditForm/AddEditForm';
import useProductDetail from '../hooks/useProductDetail';

function EditPage(props) {
  const { productId } = useParams();
  const { product, loading } = useProductDetail(productId);
  const history = useHistory();

  const handleSubmit = async (values) => {
    console.log(values);
    const valuesCopy = { ...values };
    valuesCopy.imageSrc = valuesCopy?.imageSrc[0]?.url || valuesCopy?.imageSrc[0]?.response?.data?.path;

    try {
      const productUpdate = await productAPI.update(valuesCopy, product._id);
      message.success('Cập nhật sản phẩm thành công', 3);
    } catch (error) {
      message.error('Cập nhật sản phẩm thất bại', 3);

    }
    history.push('/products');
  };

  if (!loading && product)
    return (
      <AddEditForm
        initialValues={{ ...product, imageSrc: [{ url: product.imageSrc }] }}
        isEdit
        onSubmit={handleSubmit}
      />
    );

  return (
    <div className="loading-container">
      <Spin size="large" />
    </div>
  );
}

EditPage.propTypes = {};

export default EditPage;
