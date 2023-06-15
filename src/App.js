import { useState, useEffect } from 'react';
import { usePapaParse } from 'react-papaparse';

function App() {
  const [focusedImage, setFocusedImage] = useState('');
  const [articles, setArticles] = useState([]);

  function resetFocusedImage(){
    setFocusedImage('')
  }
  return (
    <div className='min-h-full bg-gradient-to-r from-zinc-800 to-slate-600'>  
    <Header/>
    <Articles articles={articles} setArticles={setArticles} setFocusedImage={setFocusedImage}/>
    <Popup image_url={focusedImage} resetFocusedImage={resetFocusedImage}/>
    </div>

  );
    
}

function Articles({articles, setArticles, setFocusedImage}){
  let arts = articles.slice()
  const { readString } = usePapaParse();
  useEffect(() => {
    fetch('./articles.txt')
    .then(r => r.text())
    .then(text => {
      readString(text, {
        worker: false,
        complete: (results) => {
          for (const article of results.data) {
            if (arts.find(e => e['id'] === article[0])) {
              continue;
            }            
            arts.push({title: article[1], date: article[2], content: article[3], id: article[0]})
          }
        },
        });
   }).then(() => {
      setArticles(arts)
    });
  }, [])
  if(articles == null){
    return <></>
  } 
  return (
    <div className="flex justify-start flex-row flex-wrap m-12"> 
    {articles.map(article => (
      <Article data={article} setFocusedImage={setFocusedImage} />
    ))}
    </div>
  );


}

function Popup({image_url, resetFocusedImage}){
  return image_url === '' ? ( <></> ) : (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center' onClick={resetFocusedImage}>
    <img className='max-h-4xl max-w-4xl' src={image_url} alt=""/>
  </div>
  );
}
function Header(){
  return (
    <div className='pb-40 p-8 bg-center bg-cover backdrop-blur-3xl' style={{backgroundImage: `url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F991422%2Fpexels-photo-991422.jpeg%3Fcs%3Dsrgb%26dl%3Dphoto-of-grey-mountain-991422.jpg%26fm%3Djpg&f=1&nofb=1&ipt=4298c4e13639d9ca8000bf6c3676970a4ee968eb90e961d43f6bb32a5e9db4f8&ipo=images)`}}    >
      <h1 className='text-slate-800/30 text-4xl font-bold'>Cours de NSI 2023</h1>
      <a href="google.com" target='_blank' className='text-white text-xl italic hover:underline underline-offset-1 hover:text-zinc-100 decoration-zinc-900'>Blas Kozicki</a>
    </div>
  )
}

function Article({data, setFocusedImage}){
  function onArticleImageClick(){
    setFocusedImage('./images/' + data["id"] + '.png')
  }
  return(
    <article className='p-8 rounded-lg bg-zinc-700/70 mb-10 w-[40%] mx-[5%] shadow-2xl h-96'>

      <div className='mt-4 w-[50%] inline-block inline-blockalign-top h-[35%]'>
        <h1 className="text-2xl font-semibold  text-gray-200/80">{data['title']}</h1>
        <h2 className='text-base text-gray-300/60 italic'>{data['date']} </h2>
      </div> 

      <button onClick={onArticleImageClick} className='inline-block w-[50%] h-[40%]'> <img className="h-[100%] inline-block rounded-sm" src={'./images/' + data["id"] + '.png'} alt=""/></button> 
      
      <div className='bg-zinc-900/20 h-[50%] mt-[5%] p-4 rounded'>
        <p className="overflow-auto h-[100%] w-[100%] text-slate-200/70">{data['content']}</p>
      </div>
    </article>
  )
}

export default App;
