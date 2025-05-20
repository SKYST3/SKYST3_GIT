export async function getNatureEvents(
  start_date_time: string,
  end_date_time: string,
) {
  try {
    const url = `/api/nature-events?start_date_time=${start_date_time.slice(0, 19)}&end_date_time=${end_date_time.slice(0, 19)}`;
    const resJson = await fetch(url, {
      method: 'GET',
    }).then((res) => res.json());

    //console.log(resJson);

    return resJson;
  } catch (error) {
    return null;
  }
}
