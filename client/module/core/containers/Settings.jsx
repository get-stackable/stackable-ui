Settings = class Settings extends React.Component {
    getMeteorData() {

        return {
            loading: false,
            user: User.findOne(Meteor.userId)
        };
    }

    componentDidMount() {
        $('#settings-tabs .item').tab();
        Session.set('active.app', {});
    }

    render() {
        if (this.data.loading) {
            return <Loading active={true} />
        }

        return (
            <div className="ui grid full-height" style={{'marginLeft': '0'}}>
                <div className="two wide column side-sub-menu">
                    <div className="ui left vertical menu">
                        <h3 className="ui header item">
                            Settings
                        </h3>
                        <a className="ui orange button item" href="#">
                            Tools
                        </a>
                        <div className="item"></div>
                    </div>
                </div>
                <div className="fourteen wide column" style={{'paddingLeft': '0'}}>

                    <div className="content-wrapper" style={{'padding': '25px 35px !important'}}>

                        <div className="ui pointing secondary menu" id="settings-tabs">
                            <div className="item active" data-tab="profile">
                                Profile
                            </div>
                        </div>
                        <div className="ui tab active" data-tab="profile">
                            <ProfileForm user={this.data.user} />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
};

reactMixin(Settings.prototype, ReactMeteorData);
