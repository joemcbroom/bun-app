import { db } from '../../utils/DB.js';

export default function UsersPage({ users }) {
  return (
    <div>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}

export async function getServerSideProps() {
  const users = db.query('select * from users;');

  return {
    props: {
      users: users.all(),
    },
  };
}
