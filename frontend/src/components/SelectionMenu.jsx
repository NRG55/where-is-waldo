const TARGET_BOX_SIZE = 60; 
const MENU_WIDTH = 180;
const GAP = 10;

function SelectionMenu({ positionCoordinates, isOnTheleft, isTopAligned, isBottomAligned, characters, onSelect }) {   
    const { x, y } = positionCoordinates;

    const getHorizontalMenuPositionStyles = () => {
        if (isOnTheleft) {
            return { right: TARGET_BOX_SIZE + GAP };
        };

        return { left: TARGET_BOX_SIZE + GAP };        
    };

    const getVerticalMenuPositionStyles = () => {
        // the top of a menu is aligned with the top of a target box
        if (isTopAligned) {
            return { top: 0 };
        };
        
        if (isBottomAligned) {
            return { bottom: 0 };
        };              
        // menu is verticaly centered
        return { top: '50%', transform: 'translateY(-50%)' };
    };

    return (
        <div 
            className="absolute z-50 pointer-events-none" 
            style={{ 
                left: x, 
                top: y, 
                transform: 'translate(-50%, -50%)' 
            }}
        >
            <div 
                style={{ width: TARGET_BOX_SIZE, height: TARGET_BOX_SIZE }}
                className="border border-white rounded-xs shadow-[0_0_0_2px_rgba(0,0,0,0.4)]" 
            />

            <div 
                className="absolute bg-white rounded-xs border border-gray-200 pointer-events-auto"
                style={{ 
                    width: MENU_WIDTH,                            
                    ...getHorizontalMenuPositionStyles(),
                    ...getVerticalMenuPositionStyles()
                }}
            >
                {
                    characters?.map((character) => (
                        <button 
                            key={character.name}
                            className="w-full px-4 py-3 hover:bg-gray-100 cursor-pointer"
                            onClick={() => onSelect(character.name)}
                        >
                            {character.name}
                        </button>
                    ))
                }
            </div>
        </div>
    );
}

export default SelectionMenu;