function PageNotFound() {
  const containerClass =
    "flex items-center justify-center h-screen bg-gray-100";
  const titleContainerClass = "text-center";
  const titleClass = "text-4xl font-bold text-gray-800 mb-4";
  const contentClass = "text-gray-600 mb-8";
  const imageClass = "max-w-full h-auto";

  return (
    <div className={containerClass}>
      <div className={titleContainerClass}>
        <h2 className={titleClass}>404 Page Not Found</h2>
        <p className={contentClass}>
          The page you were looking for does not exist
        </p>
        <img
          src="https://www.impactplus.com/hs-fs/hubfs/404-error-page-examples-best.jpg?length=1200&name=404-error-page-examples-best.jpg"
          alt="404 Not Found"
          className={imageClass}
        />
      </div>
    </div>
  );
}

export default PageNotFound;
