import React from "react";
import { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import { NavBar } from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../API/agent";

const App = () => {
  const [activities, setActivity] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  const handleSelectedActivity = (id: string) => {
    setSelectActivity(activities.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    agent.activities.create(activity).then(() => {
      setActivity([...activities, activity]);
      setSelectActivity(activity);
      setEditMode(false);
    });
  };

  const handleEditActivity = (activity: IActivity) => {
    agent.activities.update(activity).then(() => {
      setActivity([
        ...activities.filter((a) => a.id !== activity.id),
        activity,
      ]);
      setSelectActivity(activity);
      setEditMode(false);
    });
  };

  const hanldeDeleteAcitivty = (id: string) => {
    agent.activities.delete(id).then(()=> {
      setActivity([...activities.filter((a) => a.id !== id)]);
    });
  };

  useEffect(() => {
    agent.activities.list().then((response) => {
      let activities: IActivity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split(",")[0];
        activities.push(activity);
      });
      setActivity(activities);
    });
  }, []);

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectedActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectActivity={setSelectActivity}
          handleCreateActivity={handleCreateActivity}
          handleEditActivity={handleEditActivity}
          hanldeDeleteAcitivty={hanldeDeleteAcitivty}
        />
      </Container>
    </Fragment>
  );
};

export default App;
