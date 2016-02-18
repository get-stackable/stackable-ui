Header = class Header extends React.Component {
    render() {
        return (
            <div>
                <a href={FlowRouter.path('home')}>Home</a>
                <AccountsUIWrapper />
                <SearchForm />
            </div>
        )
    }
};
