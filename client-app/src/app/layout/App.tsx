import React, { SyntheticEvent, useContext } from "react";
import { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import { NavBar } from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../API/agent";
import LoadingComponent from "./LoadingComponent";
import ActivityStore from "../store/activityStore"

const App = () => {
  const activityStore = useContext(ActivityStore);
  const [activities, setActivity] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");

  const handleSelectedActivity = (id: string) => {
    setSelectActivity(activities.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.activities
      .create(activity)
      .then(() => {
        setActivity([...activities, activity]);
        setSelectActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.activities
      .update(activity)
      .then(() => {
        setActivity([
          ...activities.filter((a) => a.id !== activity.id),
          activity,
        ]);
        setSelectActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const hanldeDeleteAcitivty = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.activities
      .delete(id)
      .then(() => {
        setActivity([...activities.filter((a) => a.id !== id)]);
      })
      .then(() => setSubmitting(false));
  };

  useEffect(() => {
    agent.activities
      .list()
      .then((response) => {
        let activities: IActivity[] = [];
        response.forEach((activity) => {
          activity.date = activity.date.split(",")[0];
          activities.push(activity);
        });
        setActivity(activities);
      })
      .then(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent content="Loading Activities" />;

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <h1>{activityStore.title}</h1>
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
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
};

export default App;
