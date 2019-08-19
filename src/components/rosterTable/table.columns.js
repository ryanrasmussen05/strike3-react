/* eslint-disable react/display-name,react/no-multi-comp */
import React from 'react';

export const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    align: 'left',
    render: name => <div><b>{ name }</b></div>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: email => <div>{ email }</div>,
  },
];
