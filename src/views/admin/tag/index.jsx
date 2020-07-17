import React from 'react';
import { Button, Card, List, Typography } from 'antd';

import { list } from './_mock';

import styles from './index.less';

const { Paragraph } = Typography;

function TagList(props) {
  const nullData = {};
  return (
    <div className={styles.cardList}>
      <List
        rowKey="id"
        // loading={loading}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        dataSource={[nullData, ...list]}
        renderItem={(item) => {
          if (item && item.title) {
            return (
              <List.Item key={item.id}>
                <Card
                  hoverable
                  className="card"
                  actions={[<a key="option1">操作一</a>, <a key="option2">操作二</a>]}
                >
                  <Card.Meta
                    avatar={<img alt="" className="cardAvatar" src={item.avatar} />}
                    title={<a>{item.title}</a>}
                    description={
                      <Paragraph
                        className="item"
                        ellipsis={{
                          rows: 3,
                        }}
                      >
                        {item.description}
                      </Paragraph>
                    }
                  />
                </Card>
              </List.Item>
            );
          }

          return (
            <List.Item>
              <Button type="dashed" className="newButton">
                {/* <PlusOutlined />  */}
                新增产品
              </Button>
            </List.Item>
          );
        }}
      />
    </div>
  );
}

export default TagList;
