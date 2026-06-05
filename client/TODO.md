Filter messages by selectedUser and use dynamic current user ID.

The chat displays all messages from the messages array regardless of which user is selected. Messages should be filtered to only show the conversation between the current user and selectedUser.

Additionally, the hardcoded sender ID "6851c9f2a7b3d91e4c8f1001" is used throughout for determining message alignment and styling. This should be replaced with a dynamic current user identifier.

Add a constant for the current user at the top of the component:

const ChatContainer = ({ selectedUser, setSelectedUser }) => {

- const CURRENT_USER_ID = "6851c9f2a7b3d91e4c8f1001"; // TODO: Get from auth context
-
- const filteredMessages = messages.filter(
- msg =>
-      (msg.senderId === CURRENT_USER_ID && msg.receiverId === selectedUser._id) ||
-      (msg.senderId === selectedUser._id && msg.receiverId === CURRENT_USER_ID)
- );
- const scrollEnd = useRef(null);
  Then update the rendering to use the filtered messages and constant:

*        {messages.map((msg, index) => (

-        {filteredMessages.map((msg, index) => (
           <div
             key={msg._id}
             className={cn(
               "flex items-end gap-2 justify-end",

*              msg.senderId !== "6851c9f2a7b3d91e4c8f1001" && "flex-row-reverse",

-              msg.senderId !== CURRENT_USER_ID && "flex-row-reverse",
               )}
             >

  And in the message bubble styling:

                     className={cn(
                       "p-2 max-w-[200px] md:text-sm font-light rounded-lg break-all bg-violet-400/50",

*                    msg.senderId === "6851c9f2a7b3d91e4c8f1001"

-                    msg.senderId === CURRENT_USER_ID
                       ? "rounded-br-none"
                       : "rounded-bl-none",
                   )}

### In Sidebar-user-card.jsx:

Replace arbitrary index-based logic with actual user properties.

The online/offline status and badge display are determined by the array index (i < 3 and i > 2), which is arbitrary and not based on actual user data. This produces inconsistent behavior—the same user will show different status depending on their position in the array.

Consider adding isOnline and unreadCount properties to the user data model.

             <CardDescription>

-              {i < 3 ? (

*              {user.isOnline ? (
                 <span className="text-green-500">Online</span>
               ) : (
                 <span>Offline</span>
               )}
             </CardDescription>
           </CardHeader>
         </div>

-        {i > 2 && <Badge className={"py-2.5 px-1.5"}>{i}</Badge>}

*        {user.unreadCount > 0 && <Badge className={"py-2.5 px-1.5"}>{user.unreadCount}</Badge>}
       </CardContent>

### In sidebar.jsx:

Implement functional search or remove non-functional UI.

The search input and "12 results" badge suggest working search functionality, but there's no state management or filtering logic. This creates a misleading user experience.

Consider either implementing the search feature or removing the results badge until the feature is ready.

Add state at the top of the component:

const Sidebar = ({ selectedUser, setSelectedUser }) => {
const navigate = useNavigate();

- const [searchQuery, setSearchQuery] = React.useState("");
-
- const filteredUsers = USER_DATA.filter(user =>
- user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
- );
  Update the input and results display:

           <InputGroup>

*          <InputGroupInput placeholder="Search user" />

-          <InputGroupInput
-            placeholder="Search user"
-            value={searchQuery}
-            onChange={(e) => setSearchQuery(e.target.value)}
-          />
           <InputGroupAddon>
             <Search />
           </InputGroupAddon>

*          <InputGroupAddon align="inline-end">12 results</InputGroupAddon>

-          <InputGroupAddon align="inline-end">{filteredUsers.length} results</InputGroupAddon>
           </InputGroup>
  Update the user list to use filtered data:

*        {USER_DATA.map((user, index) => (

-        {filteredUsers.map((user, index) => (
