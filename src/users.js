async function user() {
  try {
    const result = await fetch(`https://reqres.in/api/users?page=1`);
    const data = await result.json();
    return data[0];
  } catch (e) {
    return null;
  }
}

export { user };
