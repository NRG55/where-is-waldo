const CharactersToFind = ({ characters, foundCharacters }) => {
    return (
        <div className="flex justify-center gap-6 mb-6 p-4 bg-white rounded-xs">
            {characters.map((character) => {
                const isFound = foundCharacters.some(foundCharacter => foundCharacter.name === character.name);
                
                return (
                    <div 
                        key={character.name} 
                        className={`flex flex-col items-center ${isFound ? "opacity-40" : "opacity-100"}`}
                    >
                        <div className="relative">
                            <img 
                                src={character.imageUrl} 
                                alt={character.name} 
                                className={`w-14 h-14 rounded-full border-2 object-cover ${isFound ? "border-green-500" : "border-gray-100"}`}
                            />

                            {
                                isFound 
                                &&
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-green-500 text-3xl">&#10003;</span>
                                </div>                            
                            }
                        </div>

                        <span className="text-xs mt-2 text-gray-700">
                            {character.name}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default CharactersToFind;