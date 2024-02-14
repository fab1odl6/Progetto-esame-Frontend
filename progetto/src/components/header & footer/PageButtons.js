import { useDispatch } from "react-redux";
import { animateScroll as scroll } from "react-scroll";
import { setEveryArtworkPage, setPersonalGalleryPage } from "../../store";

function PageButtons({indexOfLastItem, filteredArray, currentPage, page}){

    const paginationbuttonClass = "mt-4 mb-8 flex items-center text-white";
    const buttonClass = "flex items-center px-2 py-1 bg-[#77aaff] rounded cursor-pointer ml-3 text-white hover:bg-blue-800";
    const notButtonClass = "pointer-events-none opacity-50";
    const currentpageClass = "flex items-center px-2 py-1 bg-[#77aaff] rounded ml-3 text-white";
    
    const dispatch = useDispatch();

    const handlePageChange = (pageNumber) => {
        if(page == "EveryArtwork"){
            dispatch(setEveryArtworkPage(pageNumber));
        } else if (page == "PersonalGallery"){
            dispatch(setPersonalGalleryPage(pageNumber));
        }
        scroll.scrollToTop();
      };

    return(
        <div className={paginationbuttonClass}>
            <button 
                className={`${buttonClass} ${currentPage === 1 ? notButtonClass : ''}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <p className={currentpageClass}> Page {currentPage}</p>
            <button 
                className={`${buttonClass} ${indexOfLastItem >= filteredArray.length ? notButtonClass : ''}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={indexOfLastItem >= filteredArray.length}
            >
                Next
            </button>
        </div>
    )
}

export default PageButtons;