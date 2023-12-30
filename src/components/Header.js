import './ComponentStyling.scss'

export default function Headers(props) {
    return (
        <>
            <header className="header">
                <div className="header-menu-left">
                    <button>
                        <svg>
                            <rect x="0.172974" width="20" height="3" rx="1.5" fill="var(--color-tone-1)"></rect>
                            <rect x="0.172974" y="7" width="20" height="3" rx="1.5" fill="var(--color-tone-1)"></rect>
                            <rect x="0.172974" y="14" width="20" height="3" rx="1.5" fill="var(--color-tone-1)"></rect>
                        </svg>
                    </button>
                </div>
                <h1 className='header-title'>Wordle</h1>  
                <menu></menu>  
            </header> 
            
        </>
        
    )
}