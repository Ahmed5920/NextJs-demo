import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MongoClient,ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

const MeetupDetailPage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description}/>
      </Head>
      <MeetupDetail
      image={props.image}
      title={props.title}
      address={props.address}
      description={props.description}
      />
    </Fragment>

  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect('mongodb+srv://AhmedMagdy:4tzvVzDGOJljERBC@cluster0.z2sbz4w.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
    const db = client.db();
    const meetupsCollections = db.collection('meetups');
    const meetups = await meetupsCollections.find({},{_id:1}).toArray();
    client.close();
  return {
    fallback:false,
    paths: meetups.map(meetup => ({
      params: {meetupId:meetup._id.toString()}
    }))
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect('mongodb+srv://AhmedMagdy:4tzvVzDGOJljERBC@cluster0.z2sbz4w.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
    const db = client.db();
    const meetupsCollections = db.collection('meetups');
    const selectedMeetup = await meetupsCollections.findOne({_id:new ObjectId(meetupId)});
    client.close();
  return {
    props: {
        id:selectedMeetup._id.toString(),
        image:selectedMeetup.image,
        address:selectedMeetup.address,
        title:selectedMeetup.title,
        description:selectedMeetup.description
    },
  };
};
export default MeetupDetailPage;
