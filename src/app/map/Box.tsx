export default function Box({ shop_id, address }) {
  console.log('shop_id:', shop_id);
  return (
    <div
      style={{
        position: 'absolute',
        width: '400px',
        height: '700px',
        backgroundColor: '#fff',
        zIndex: 9999,
        top: '50%',
        right: '4rem',
        transform: 'translateY(-50%)',
        padding: '3rem',
        borderRadius: '2rem',
      }}
    >
      {shop_id < 0 ? <h2>가게를 선택해주세요</h2> : <h2>{address}</h2>}
    </div>
  );
}
