import React, { useEffect } from 'react';
import { Policy } from '../../defaultStyle';
import ReactGA from 'react-ga';

const PrivacyPage = () => {
	useEffect(() => {
		document.title = `SwiftSheet - Privacy`;
	});
	ReactGA.pageview('/privacy');

	return (
		<Policy>
			<div>
				<h1>Welcome to our Privacy Policy</h1>
				<h3>Your privacy is critically important to us.</h3>

				<p>
					It is SwiftSheet's policy to respect your privacy regarding any
					information we may collect while operating our website. This Privacy
					Policy applies to <a href="https://swiftsheet.app">swiftsheet.app</a>{' '}
					(hereinafter, "us", "we", or "swiftsheet.app"). We respect your
					privacy and are committed to protecting personally identifiable
					information you may provide us through the Website. We have adopted
					this privacy policy ("Privacy Policy") to explain what information may
					be collected on our Website, how we use this information, and under
					what circumstances we may disclose the information to third parties.
					This Privacy Policy applies only to information we collect through the
					Website and does not apply to our collection of information from other
					sources.
				</p>
				<p>
					This Privacy Policy, together with the Terms and conditions posted on
					our Website, set forth the general rules and policies governing your
					use of our Website. Depending on your activities when visiting our
					Website, you may be required to agree to additional terms and
					conditions.
				</p>

				<h2>Website Visitors</h2>
				<p>
					Like most website operators, SwiftSheet collects
					non-personally-identifying information of the sort that web browsers
					and servers typically make available, such as the browser type,
					language preference, referring site, and the date and time of each
					visitor request. SwiftSheet's purpose in collecting non-personally
					identifying information is to better understand how SwiftSheet's
					visitors use its website. From time to time, SwiftSheet may release
					non-personally-identifying information in the aggregate, e.g., by
					publishing a report on trends in the usage of its website.
				</p>

				<h2>Gathering of Personally-Identifying Information</h2>
				<p>
					As SwiftSheet does not require user account creation, personally
					identifiable information such as emails are not recorded.
				</p>

				<h2>Security</h2>
				<p>
					The security of your Personal Information is important to us, but
					remember that no method of transmission over the Internet, or method
					of electronic storage is 100% secure. While we strive to use
					commercially acceptable means to protect your Personal Information, we
					cannot guarantee its absolute security. Likewise we remind users this
					site is run as a volunteer effort with limited monitoring and as such
					is provided as-is.
				</p>

				<h2>Advertisements</h2>
				<p>
					Ads appearing on our website may be delivered to users by advertising
					partners, who may set cookies. These cookies allow the ad server to
					recognize your computer each time they send you an online
					advertisement to compile information about you or others who use your
					computer. This information allows ad networks to, among other things,
					deliver targeted advertisements that they believe will be of most
					interest to you. This Privacy Policy covers the use of cookies by
					SwiftSheet and does not cover the use of cookies by any advertisers.
				</p>

				<h2>Links To External Sites</h2>
				<p>
					Our Service may contain links to external sites that are not operated
					by us. If you click on a third party link, you will be directed to
					that third party's site. We strongly advise you to review the Privacy
					Policy and terms and conditions of every site you visit.
				</p>
				<p>
					We have no control over, and assume no responsibility for the content,
					privacy policies or practices of any third party sites, products or
					services.
				</p>

				<h2>Privacy Policy Changes</h2>
				<p>
					Although most changes are likely to be minor, SwiftSheet may change
					its Privacy Policy from time to time, and in SwiftSheet's sole
					discretion. SwiftSheet encourages visitors to frequently check this
					page for any changes to its Privacy Policy. Your continued use of this
					site after any change in this Privacy Policy will constitute your
					acceptance of such change.
				</p>

				<h2>Credit & Contact Information</h2>
				<p>
					This privacy policy was created with{' '}
					<a
						href="https://termsandconditionstemplate.com/privacy-policy-generator/"
						title="Privacy policy template generator"
						target="_blank"
					>
						termsandconditionstemplate.com
					</a>
					. If you have any questions about this Privacy Policy, please contact
					us via <a href="mailto:swiftsheetapp@gmail.com">email</a>.
				</p>
			</div>
		</Policy>
	);
};

export default PrivacyPage;
