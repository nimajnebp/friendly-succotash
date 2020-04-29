import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createTodo, deleteTodo, updateTodo } from 'actions/appActions';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import './Todos.scss';

// Ant UI tools.
import { Input, Button, Tooltip, Divider, List, Typography, Empty } from 'antd';
import { PlusCircleOutlined, FilterOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

// Ant Motion tools.
import QueueAnim from 'rc-queue-anim';

const Todos = ({ todosArr, dispatchCreateTodo, dispatchDeleteTodo, dispatchUpdateTodo }) => {
  // Hooks and related
  const [todoContent, setTodoContent] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [checkAll, setCheckAll] = useState(true);
  const [showDoneOnly, setShowDoneOnly] = useState(false);
  const [showTodoOnly, setShowTodoOnly] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const inputRef = React.createRef();
  useEffect(() => (inputRef.current ? inputRef.current.focus() : undefined));

  // Handlers
  const handleChange = (event) => { setTodoContent(event.target.value); };
  const handleSearch = (event) => { setSearchKey(event.target.value); };
  const handleDelete = (arr) => { arr.map((e) => dispatchDeleteTodo(e.id)); };
  const handleUpdate = (arr, k, v) => { arr.map((e) => dispatchUpdateTodo(e.id, k, v)); };
  const handleSubmit = () => { dispatchCreateTodo(uuid(), todoContent.length ? todoContent : ''); setTodoContent(''); };

  // elements
  const simpleDivider = (<Divider type="vertical" style={{ margin: '0' }} />);
  const buttonShowDone = (<Button type="link" onClick={() => { setShowDoneOnly(!showDoneOnly); setShowTodoOnly(false); }}>Show done</Button>);
  const buttonShowTodo = (<Button type="link" onClick={() => { setShowTodoOnly(!showTodoOnly); setShowDoneOnly(false); }}>Show todo</Button>);
  const buttonShowAll = (
    <Button type="link" onClick={() => { setShowAll(true); setShowTodoOnly(false); setShowDoneOnly(false); setSearchKey(''); }}>Show all</Button>
  );
  const buttonToggleAll = (
    <Button type="link" onClick={() => { handleUpdate(todosArr, 'isDone', checkAll); setCheckAll(!checkAll); }}>Toggle all</Button>
  );
  const buttonDeleteAll = (<Button type="link" onClick={() => { handleDelete(todosArr); }}>Remove all</Button>);
  const buttonLayoutArr = [
    buttonShowDone, simpleDivider, buttonShowTodo, simpleDivider, buttonShowAll, simpleDivider, buttonToggleAll, simpleDivider, buttonDeleteAll,
  ];
  const toolTipAdd = (<Tooltip title="Add" placement="left"><PlusCircleOutlined /></Tooltip>);
  const toolTipFilter = (<Tooltip title="Filter" placement="left"><FilterOutlined /></Tooltip>);
  const listItem = (e) => (
    <List.Item key={e.id}>
      <div key={e.id} style={{ width: '100%' }}>
        <Typography.Paragraph
          onChange={(event) => { handleUpdate([{ id: e.id }], 'content', event.target.value); }}
          editable={{ onChange: (str) => { handleUpdate([{ id: e.id }], 'content', str); } }}
          delete={e.isDone}
          strong
          code
          style={{ wordBreak: 'break-word', fontSize: '1rem' }}
        >
          {e.content}
        </Typography.Paragraph>
        <Tooltip title={e.isDone ? 'Undone it' : 'Make it done'} placement="bottom">
          <Button
            type="link"
            onClick={() => { handleUpdate([{ id: e.id }], 'isDone', !e.isDone); }}
          >
            { e.isDone ? 'Done' : 'Still todo'}
          </Button>
        </Tooltip>
        { simpleDivider }
        <Tooltip title="Remove" placement="bottom">
          <Button type="link" onClick={() => { handleDelete([{ id: e.id }]); }}>
            <DeleteOutlined />
          </Button>
        </Tooltip>
        { simpleDivider }
        <Tooltip title={`Created: ${e.created}`} placement="bottom">
          <Button type="link">
            <InfoCircleOutlined />
          </Button>
        </Tooltip>
      </div>
    </List.Item>
  );
  const list = todosArr
    .filter((e) => (showDoneOnly ? e.isDone : true))
    .filter((e) => (showTodoOnly ? !e.isDone : true))
    .filter(() => showAll)
    .filter((e) => e.content.includes(searchKey))
    .sort((a, b) => b.created - a.created)
    .map((e) => listItem(e));
  const emptyList = (<div key="1"><Empty description="Nothing to show" /></div>);

  return (
    <div className="section-todos">
      <Divider orientation="left" style={{ fontSize: '1.5rem' }}>Todos</Divider>
      <Input
        addonBefore={toolTipAdd}
        placeholder="Add new..."
        allowClear
        value={todoContent}
        onChange={handleChange}
        onPressEnter={handleSubmit}
        style={{ textAlign: 'left' }}
      />
      <Input
        addonBefore={toolTipFilter}
        placeholder="Filter..."
        allowClear
        value={searchKey}
        onChange={(event) => { handleSearch(event); }}
      />
      { buttonLayoutArr.map((e) => (<span key={uuid()}>{e}</span>)) }
      <Divider orientation="left" style={{ fontSize: '1rem' }}>
        {(!showTodoOnly && !showDoneOnly) ? 'Your list - all' : null}
        {showTodoOnly ? 'Your list - todo' : null}
        {showDoneOnly ? 'Your list - done' : null}
      </Divider>
      { list.length > 0 ? null : (<QueueAnim type={['bottom', 'top']}>{emptyList}</QueueAnim>)}
      <QueueAnim type={['right', 'right']}>{ list }</QueueAnim>
    </div>
  );
};

const mapStateToProps = (store) => ({
  todosArr: store.appReducer.todos,
});

const mapDispatchToProps = {
  dispatchCreateTodo: createTodo,
  dispatchDeleteTodo: deleteTodo,
  dispatchUpdateTodo: updateTodo,
};

Todos.propTypes = {
  todosArr: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatchCreateTodo: PropTypes.func.isRequired,
  dispatchDeleteTodo: PropTypes.func.isRequired,
  dispatchUpdateTodo: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
