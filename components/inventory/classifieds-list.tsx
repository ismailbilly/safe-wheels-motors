import { ClassifiedWithImages } from "@/config/types"
import { ClassifiedCard } from "./classified-card";

interface ClassifiedListProps {
  classifieds: ClassifiedWithImages[];
  favourites: number[];
  
}
export const ClassifiedsList = (props: ClassifiedListProps) => {
    const {classifieds, favourites} = props;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {classifieds.map((classified) => {
        return (
          <ClassifiedCard
            key={classified.id}
            classified={classified}
            favourites={favourites}
          />
        );
      })}
    </div>
  );
}
