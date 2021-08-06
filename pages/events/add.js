import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import { parseCookie } from '@/helpers/index';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/Form.module.css';

const AddEventsPage = ({ token }) => {
  const [values, setValues] = useState({
    name: '',
    venue: '',
    performers: '',
    description: '',
    date: '',
    time: '',
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(values).some(
      (elements) => elements === ''
    );
    if (hasEmptyFields) {
      toast.error('Please Fill in All Fields');
    }

    const res = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      toast.error('Something Went Wrong ..');
    } else {
      const evt = await res.json();
      router.push(`/events/${evt.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };
  return (
    <Layout title='Add New Events'>
      <Link href='/events'>Go Back</Link>
      <h1>Add Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Event Name</label>
            <input
              type='text'
              id='name'
              value={values.name}
              name='name'
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor='venue'>Venue</label>
            <input
              type='text'
              id='venue'
              value={values.venue}
              name='venue'
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='performers'>Performers</label>
            <input
              type='text'
              id='performers'
              value={values.performers}
              name='performers'
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor='date'>Date</label>
            <input
              type='date'
              id='date'
              value={values.date}
              name='date'
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='time'>Time</label>
            <input
              type='text'
              id='time'
              value={values.time}
              name='time'
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor='description'>Event Description</label>
          <textarea
            name='description'
            id='description'
            cols='30'
            rows='10'
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button type='submit' className='btn'>
          Add Event
        </button>
      </form>
    </Layout>
  );
};

export default AddEventsPage;

export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req);

  return {
    props: {
      token,
    },
  };
}
