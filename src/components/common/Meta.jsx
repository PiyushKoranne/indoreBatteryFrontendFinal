import {Helmet} from 'react-helmet'

const Meta = (props) => {
  return (
        <Helmet>
				<title>{props.title}</title>
				<link rel="icon" type="image/x-icon" href="/fav.ico"></link>
        <meta name="description" content={props.desc} />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.desc} />
        <meta name="keywords" content={props.keywords} />
        <meta property="og:title" content={props.title} />
        <meta property="og:site_name" content="Indore Battery" />
        <meta property="og:url" content="" />
        <meta property="og:description" content={props.desc} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content= {"/logo.svg"}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="" />
        <meta
          property="twitter:url"
          content=""
        />
        <meta name="twitter:title" content={props.title} />
        <meta name="twitter:description" content={props.desc} />
        <meta
          name="twitter:image"
          content=""
        />
        </Helmet>
  )
}

export default Meta
