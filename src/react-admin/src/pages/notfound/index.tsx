import { Link } from 'react-router-dom'

export default function NotFound() {
  return <div className="not-found-page">
    <h1>Sorry! The page not found.</h1>
    <Link to="/">Back to index.</Link>
  </div>
}