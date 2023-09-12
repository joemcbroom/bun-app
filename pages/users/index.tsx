import { db } from '../../utils/DB.js';
import AddUser from './AddUser.tsx';

// uses tailwindcss
export default function UsersPage({ users }) {
  return (
    <>
      <div className='flex gap-2 w-full flex-wrap'>
        {users.map(user => (
          <div
            className='w-72 h-36 flex flex-col items-center justify-center border'
            key={user.id}
          >
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <a href={`/users/${user.id}`}>View user</a>
          </div>
        ))}
      </div>
      <AddUser />
    </>
  );
}

export async function getServerSideProps() {
  const response = db.query('select * from users;');
  const users = response.all();

  return {
    props: {
      users,
    },
  };
}
