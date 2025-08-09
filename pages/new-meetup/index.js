import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";

const NewMeetupPage = () =>{
    const router = useRouter();
    const addMeetupHandler = async(meetupData) =>{
        const response = await fetch('/api/new-meetup',{
            method: 'POST',
            body: JSON.stringify(meetupData),
            headers:{
                'Content-Type' : 'application/json'
            }
        })
        const data = await response.json();
        console.log(data);
        router.push('/');
    }
    return (
        <Fragment>
            <Head>
                <title>add New Meetup</title>
                <meta name="description" content="add your own meetups" />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </Fragment>
    )
}

export default NewMeetupPage;