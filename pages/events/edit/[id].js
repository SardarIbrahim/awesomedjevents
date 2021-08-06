import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import ImageUpload from '@/components/ImageUpload';
import { API_URL } from '@/config/index';
import { parseCookie } from '@/helpers/index';

import { FaImage } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/Form.module.css';
import moment from 'moment';

const EditEventsPage = ({ evt, token }) => {
  const [image, setImage] = useState(
    evt.image ? evt.image.formats.thumbnail.url : null
  );

  const [showModal, setShowModal] = useState(false);
  const [values, setValues] = useState({
    name: evt.name,
    venue: evt.venue,
    performers: evt.performers,
    description: evt.description,
    date: evt.date,
    time: evt.time,
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

    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: 'PUT',
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

  const imageUploaded = async () => {
    const res = await fetch(`${API_URL}/events/${evt.id}`);
    const data = await res.json();

    setImage(data.image.formats.thumbnail.url);
    setShowModal(false);
  };

  return (
    <Layout title='Update Event'>
      <Link href='/events'>Go Back</Link>
      <h1>Edit Event</h1>
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
              value={moment(values.date).format('yyyy-DD-MM')}
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
          Update Event
        </button>
      </form>
      <h2>Event Image</h2>
      {image ? (
        <Image height={100} width={170} src={image} />
      ) : (
        <div>
          <p>No Image Uploaded</p>
        </div>
      )}

      <div>
        <button
          onClick={() => setShowModal(true)}
          className='btn-secondary btn-icon'
        >
          {FaImage} Set Image
        </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload
          evtId={evt.id}
          imageUploaded={imageUploaded}
          token={token}
        />
      </Modal>
    </Layout>
  );
};

export default EditEventsPage;

export async function getServerSideProps({ params: { id }, req }) {
  const { token } = parseCookie(req);
  const response = await fetch(`${API_URL}/events/${id}`);
  const evt = await response.json();

  return {
    props: { evt, token },
  };
}
