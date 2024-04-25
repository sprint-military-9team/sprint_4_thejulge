import { AnnounceData } from '@/types/announcePageType';

const BASE_URL = 'https://bootcamp-api.codeit.kr/api/0-1/the-julge/notices';

const getAnnounceData = async (
  offset: number,
  limit: number,
  address: string[] | null,
  keyword: string | null,
  startsAtGte: string | null,
  hourlyPayGte: number | null,
  sort: 'time' | 'pay' | 'hour' | 'shop',
): Promise<AnnounceData> => {
  const queryParams = new URLSearchParams({
    offset: offset.toString(),
    limit: limit.toString(),
    sort,
  });
  if (address && address.length) {
    address.forEach((addr) => queryParams.append('address', addr));
  }

  if (keyword) {
    queryParams.set('keyword', keyword);
  }

  if (startsAtGte) {
    queryParams.set('startsAtGte', startsAtGte);
  }

  if (hourlyPayGte !== null) {
    queryParams.set('hourlyPayGte', hourlyPayGte.toString());
  }

  const apiUrl = `${BASE_URL}?${queryParams.toString()}`;
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('API 호출에 실패했습니다.');
    }
    const data: AnnounceData = await response.json();
    return data;
  } catch (error) {
    console.error('API호출 실패:', error);
    throw error;
  }
};

export default getAnnounceData;
