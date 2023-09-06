import { TIngredient } from "./types/types";

export const checkCategory = (ids: string[]) : { uniqueIds?: string[]; repeatsIds?: { id: string; count: number }[] } => {
    const idCountMap: { [id: string]: number } = {};
    
    ids?.forEach((id) => {
      idCountMap[id] = (idCountMap[id] || 0) + 1;
    });  
    const uniqueIds = Object.keys(idCountMap).filter((id) => idCountMap[id] === 1);
    const repeatsIds = Object.keys(idCountMap)
      .filter((id) => idCountMap[id] > 1)
      .map((id) => ({ id, count: idCountMap[id] }));
    return {
      uniqueIds: uniqueIds.length > 0 ? uniqueIds : undefined,
      repeatsIds: repeatsIds.length > 0 ? repeatsIds : undefined,
    };
  };
  
  export const checkPathId = (path: string) => {
    const pieces: string[] = path.split("/");
    const lastPiece: string = pieces[pieces.length - 1];
    console.log(lastPiece, "lastPart");
    return lastPiece;
  };
  
  export const checkTimeStamp = (lastEdit: string): string => {
    const inputDateObj: Date = new Date(lastEdit);
    const currentDate: Date = new Date();
    const timeDifference: number = currentDate.getTime() - inputDateObj.getTime();
    const daysDifference: number = Math.floor(
      timeDifference / (1000 * 60 * 60 * 24)
    );
    const hours = inputDateObj.getHours().toString().padStart(2, "0");
    const minutes = inputDateObj.getMinutes().toString().padStart(2, "0");
    const timeString = `${hours}:${minutes}`;
    if (daysDifference === 0) {
      return `Сегодня, ${timeString}`;
    } else if (daysDifference === 1) {
      return `Вчера, ${timeString}`;
    } else {
      return `${daysDifference} ${
        daysDifference < 5 ? "дня" : "дней"
      } назад, ${timeString}`;
    }
  };
  

  
  
  