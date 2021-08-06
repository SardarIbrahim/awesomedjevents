import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';

import { API_URL } from '@/config/index';

import Link from 'next/link';
import { useRouter } from 'next/router';
import qs from 'qs';

export default function SearchPage({ events }) {
  const router = useRouter();

  return (
    <Layout title='Search Results'>
      <h1>Search Results for {router.query.term} </h1>
      {events.length === 0 && <h3>No Events To Show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      <Link href='/events'>
        <a>Go Home</a>
      </Link>
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { venue_contains: term },
      ],
    },
  });

  const res = await fetch(`${API_URL}/events?${query}`);
  const events = await res.json();
  return {
    props: {
      events,
    },
  };
}
