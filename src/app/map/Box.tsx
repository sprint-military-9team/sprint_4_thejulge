import Image from 'next/image';

export default function Box({ shop_id, shop_name }: { shop_id: number; shop_name: string }) {
  // useEffect(()=>{
  //   (
  //     async function(){
  //       await fetch(`mockData`);
  //     }
  //   )
  // },[]);

  return (
    <div
      style={{
        position: 'absolute',
        width: '400px',
        height: '700px',
        backgroundColor: '#fff',
        zIndex: 9999,
        top: '8%',
        right: '4rem',
        padding: '3rem',
        borderRadius: '2rem',
      }}
    >
      <h2 style={{ paddingBottom: '3rem' }}>{shop_id < 0 ? '가게를 선택해주세요' : `${shop_name}의 공고들`}</h2>
      <div style={{ display: 'flex', gap: '1.5rem', borderBottom: '1px solid #aaa', paddingBottom: '1rem' }}>
        <div
          style={{
            width: '8rem',
            height: '8rem',
            position: 'relative',
            borderRadius: '1rem',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <Image fill src="/assets/image.png" alt="af" />
        </div>
        <div>
          {/* <h3 style={{ marginBottom: '1rem' }}>{}</h3> */}
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis eum suscipit ex repudiandae saepe! Magni
            ex velit laudantium, consectetur sunt, dolores quam sequi tempora minima ea at quam sequi tempora minima ea
            at. quam sequi tempora minima ea at.quam sequi tempora minima ea at. quam sequi tempora minima ea at.
          </p>
        </div>
      </div>
    </div>
  );
}
