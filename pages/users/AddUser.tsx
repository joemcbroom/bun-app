const AddUser = () => {
  return (
    <form
      className='flex flex-col items-start justify-start gap-2 mt-4 mx-auto w-1/2'
      action='/api/users/create'
      method='post'
    >
      <h2>Add a user</h2>
      <label>
        Name
        <input
          className='text-black ml-4'
          type='text'
          name='name'
        />
      </label>

      <label>
        Email
        <input
          className='text-black ml-4'
          type='email'
          name='email'
        />
      </label>

      <button type='submit'>Add user</button>
    </form>
  );
};

export default AddUser;
