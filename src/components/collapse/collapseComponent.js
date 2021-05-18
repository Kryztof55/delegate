import React from "react";
import { Collapse, Divider } from "antd";
const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const CollapseComponent = (props) => {
  const { data } = props;
  return (
    <Collapse defaultActiveKey={[data[0].id]} onChange={callback}>
      {data.map((el) => {
        return (
          <Panel header={el.first_name} key={el.id}>
            <p>{el.email}</p>
          </Panel>
        );
      })}
    </Collapse>
  );
};

export default CollapseComponent;
