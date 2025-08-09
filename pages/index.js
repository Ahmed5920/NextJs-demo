import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browser a list of active React Meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   return{
//     props:{
//       meetups:DUMMY_MEETUPS
//     }
//   }
// }

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://AhmedMagdy:4tzvVzDGOJljERBC@cluster0.z2sbz4w.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const meetupsCollections = db.collection("meetups");
  const meetups = await meetupsCollections.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        address: meetup.address,
        image: meetup.image,
        title: meetup.title,
      })),
    },
    revalidate: 1,
  };
};

export default HomePage;
