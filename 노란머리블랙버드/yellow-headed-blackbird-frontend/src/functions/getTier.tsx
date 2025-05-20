// Tier에 대한 정보를 가져오기 위해 /api/tiers/에 GET 요청
// Tier은 {"name": "Tier", "until": 100} 형태로 되어있음

export async function getTier() {
  try {
    const url = '/api/tier/';
    const resJson = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    }).then((res) => res.json());

    //console.log(resJson);

    const formatted: { [key: string]: number } = Object.fromEntries(
      resJson.map(({ name, cut }: { name: string; cut: number }) => [
        name,
        cut,
      ]),
    );

    return formatted as {
      [key: string]: number;
    };
  } catch (error) {
    return { 새싹: 10000 };
  }
}
