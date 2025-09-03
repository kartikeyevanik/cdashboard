export const getEventTypeVariant = (eventType: string) => {
    switch (eventType) {
        case "login":
            return "default"      // blue (primary)
        case "logout":
            return "secondary"    // gray
        case "create":
            return "outline"      // neutral
        case "update":
            return "default"      // reuse default
        case "delete":
            return "destructive"  // red
        default:
            return "secondary"
    }
}
