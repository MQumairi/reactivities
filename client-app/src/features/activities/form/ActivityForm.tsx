import React, { useState, useContext } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import {v4 as uuid} from "uuid";
import ActivityStore from "../../../app/store/activityStore"
import { observer } from "mobx-react-lite";

interface IProps {
  selectedActivity: IActivity | null;
}

const ActivityForm: React.FC<IProps> = ({
  selectedActivity,
}) => {

  const activityStore = useContext(ActivityStore);

  const initializeForm = () => {


    if (selectedActivity) return selectedActivity;

    return {
      id: "",
      title: "",
      category: "",
      description: "",
      date: "",
      city: "",
      venue: "",
    };
  };

  const [activity, setactivity] = useState<IActivity>(initializeForm);

  const handleInputChange = (event: any) => {
    setactivity({ ...activity, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    if(activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      }
      activityStore.createActivity(newActivity);
    } else {
      activityStore.editActivity(activity);
    }
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          rows={2}
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={handleInputChange}
        />
        <Form.Input
          type="datetime-local"
          placeholder="Date"
          value={activity.date.split(".")[0]}
          name="date"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={handleInputChange}
        />
        <Button loading={activityStore.submitting} floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={activityStore.cancelFormOpen}
          floated="right"
          basic
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
