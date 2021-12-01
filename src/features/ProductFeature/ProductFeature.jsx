import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ListPage from './ListPage/ListPage';
import AddEditPage from './AddEditPage/AddEditPage';

function ProductFeature(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={match.url} exact component={ListPage} />
      <Route path={`${match.url}/:productFeatureId`} component={AddEditPage} />
    </Switch>
  );
}

ProductFeature.propTypes = {};

export default ProductFeature;
