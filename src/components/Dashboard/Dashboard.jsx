import React from 'react';
import { connect } from 'react-redux';
import history from 'services/config';
import uuid from 'react-uuid';

// Ant UI tools.
import { Divider, Card, Progress, Tag, Typography } from 'antd';

// Ant Motion tools.
import QueueAnim from 'rc-queue-anim';
import PropTypes from 'prop-types';

const Dashboard = ({ todosArr }) => {
  // Statistics tools.
  const totalTodos = todosArr.length;
  const doneTodos = todosArr.filter((e) => e.isDone).length;
  const todoTodos = todosArr.filter((e) => !e.isDone).length;
  const percentage = (target, total) => Number((target / total) * 100).toFixed(0);
  const donePercentage = Number(percentage(doneTodos, totalTodos));
  const todoPercentage = Number(percentage(todoTodos, totalTodos));

  // Animate element
  const animArr = [
    (<Divider orientation="left"><Tag color="orange" key={1}>Total</Tag></Divider>),
    (<Typography.Paragraph code>{totalTodos}</Typography.Paragraph>),
    (<Divider orientation="left"><Tag color={(donePercentage === 100) ? 'green' : 'blue'} key={1}>Done</Tag></Divider>),
    (<Progress percent={donePercentage} size="small" type="line" width={80} format={(percent) => `${percent}%`} />),
    (<Divider orientation="left"><Tag color="red" key={1}>Still todo</Tag></Divider>),
    (<Progress percent={todoPercentage} size="small" type="line" width={80} status="exception" format={(percent) => `${percent}%`} />),
  ];

  return (
    <div className="section-dashboard">
      <Divider orientation="left" style={{ fontSize: '1.5rem' }}>Dashboard</Divider>
      <Card title="Todo Statistics" bodyStyle={{ paddingTop: '.5rem' }} hoverable style={{ maxWidth: '300px' }} onClick={() => { history.push('/todos'); }}>
        <QueueAnim>
          { animArr.map((e) => (<div key={uuid()}>{e}</div>)) }
        </QueueAnim>
      </Card>
    </div>
  );
};


Dashboard.propTypes = {
  todosArr: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (store) => ({
  todosArr: store.appReducer.todos,
});

export default connect(mapStateToProps)(Dashboard);
