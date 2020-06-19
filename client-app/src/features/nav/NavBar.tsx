import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import ActivityStore from "../../app/store/activityStore"
import { observer } from "mobx-react-lite";


// Don't forget to change component signature:
// const ActivityDashboard: React.FC<IProps> = ({
//List props here (seperated by ",")
// }) => {

const NavBar: React.FC = () => {
  const activityStore = useContext(ActivityStore)

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button
            onClick={activityStore.openCreateForm}
            positive
            content="Create Activity"
          ></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);