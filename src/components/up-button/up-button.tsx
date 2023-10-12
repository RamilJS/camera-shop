import { Link } from 'react-router-dom';

function UpButton(): JSX.Element {

  const handleOnScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Link
      onClick={handleOnScroll}
      className="up-btn"
      to="#header"
    >
      <svg width={12} height={18} aria-hidden="true">
        <use xlinkHref="#icon-arrow2" />
      </svg>
    </Link>
  );
}

export default UpButton;
