const PRINT_LOGS = import.meta.env.PRINT_LOGS === 'true';

export default function log(...messages){
		if(PRINT_LOGS){
			messages.forEach(message => {
				console.log(message)
			})
		}
}