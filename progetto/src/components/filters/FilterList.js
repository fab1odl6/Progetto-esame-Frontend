import FilterDropdown from "../dropdowns/FilterDropdown";
import InputDropdown from "../dropdowns/InputDropdown";
import SliderDropdown from "../dropdowns/SliderDropdown";
import CheckboxDropdown from "../dropdowns/CheckboxDropdown";
import SelectedFilters from "./SelectedFilters";
import { useSelector } from "react-redux";
import GeneralDropdown from "../dropdowns/GeneralDropdown";
import SliderDropdownPanel from "../dropdowns/SliderDropdown";

function FilterList({ artworks }) {
  const containerClass = "z-8";
  const dropdownContainerClass = "mt-4 justify-center align-center flex z-8";

  const filtersState = useSelector((state) => state.filters);

  const extractUnique = (artworks, fieldName) => {
    return artworks.reduce((uniqueValue, artwork) => {
      const fieldValue = artwork[fieldName];
      const isDuplicate = uniqueValue.some(
        (author) => author.value === fieldValue
      );
      if (isDuplicate) {
        return uniqueValue;
      }
      return [
        ...uniqueValue,
        {
          label: fieldValue,
          value: fieldValue,
        },
      ];
    }, []);
  };

  const artworkAuthors = extractUnique(artworks, "authorName");
  const artworkType = extractUnique(artworks, "type");

  //CALCOLO ANNO MAX E MIN PER FILTRO
  const artworkYears = artworks.map((artwork) => {
    return parseInt(artwork.date, 10);
  });

  const findMinMax = (numbers) => {
    const filteredNumbers = numbers.filter((num) => !isNaN(num));
    const max = Math.max(...filteredNumbers);
    const min = Math.min(...filteredNumbers);
    return { max, min };
  };

  const intervalYears = findMinMax(artworkYears);

  //NAZIONALITA' DELLE OPERE
  const nations = artworks.reduce((uniqueNations, artwork) => {
    const countryBeforeComma = artwork.country.split(",")[0].trim();
    const isDuplicateOrEmpty =
      uniqueNations.some((nation) => nation.value === countryBeforeComma) ||
      countryBeforeComma === "";
    if (isDuplicateOrEmpty) {
      return uniqueNations;
    }
    return [
      ...uniqueNations,
      {
        label: countryBeforeComma,
        value: countryBeforeComma,
      },
    ];
  }, []);

  const combinedFilters = Object.entries(filtersState).flatMap(
    ([filterName, filterValues]) => {
      return filterValues.map((filterValue) => ({
        filterName,
        filterValue,
      }));
    }
  );

  return (
    <div className={containerClass}>
      <div className={dropdownContainerClass}>
        <GeneralDropdown title="Author" options={artworkAuthors} />
        <GeneralDropdown title="Artwork type" options={artworkType} />
        <GeneralDropdown title="End Year" options={intervalYears}/>
        <GeneralDropdown title="Nationality" options={nations} />
      </div>
      <div>
        {combinedFilters.length > 0 && (
          <SelectedFilters filters={combinedFilters} />
        )}
      </div>
    </div>
  );

  //<CheckboxDropdown options={nations} title="Nationality" />
  //<FilterDropdown option={artworkType} title="Artwork type" />
  //<SliderDropdown option={intervalYears} title="End Year" />
  //<InputDropdown option={artworkAuthors} title="Author" />
}

export default FilterList;
