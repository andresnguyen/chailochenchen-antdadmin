import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddPage from './AddPage/AddPage';
import EditPage from './EditPage/EditPage';
import ListPage from './ListPage/ListPage';

function ProductFeature(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={match.url} exact component={ListPage} />
      <Route path={`${match.url}/add`} component={AddPage} />
      <Route path={`${match.url}/:productId`} component={EditPage} />
    </Switch>
  );
}

ProductFeature.propTypes = {};

export default ProductFeature;
