import DashboardEvent from '@/components/DashboardEvent';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';

import { parseCookie } from '@/helpers/index';

import styles from '@/styles/Dashboard.module.css';
import router from 'next/router';

const DashboardPage = ({ events, token }) => {
  const deleteEvent = async (id) => {
    if (confirm('Are You Sure')) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
  };
  return (
    <Layout title='User Dashboard'>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>
        {events.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  );
};

export default DashboardPage;

export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req);

  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();
  console.log(events);
  return {
    props: {
      events,
      token,
    },
  };
}
