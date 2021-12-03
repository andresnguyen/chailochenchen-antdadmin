import { useEffect, useState } from 'react';
import productAPI from '../../../api/productAPI';

export default function useProductList(filters) {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data, pagination } = await productAPI.getAll(filters);
        setProductList(data);
        setPagination(pagination)
      } catch (error) {
        console.log('Failed to fetch product', error);
      }

      setLoading(false);
    })();
  }, [filters]);

  return { productList, pagination, loading };
}