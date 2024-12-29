'use strict';

const native = require('./build/Release/fxml');

const DEFAULT_OPTIONS = {
    empty_tag_value: "",
    parse_int_numbers: true,
    parse_float_numbers: true,
    skip_parse_when_begins_with: ''
};

/**
 * @param {*} val - Any value to check
 * @return {boolean} - `true` if object, otherwise `false`
 */
const isObject = val => typeof val === 'object' && val !== null;

/**
 * Process options and call RapidXML
 *
 * @param {string|Buffer} xml - The XML to parse.
 * @param {object} [options] - Change default options (optional).
 * @param {function} [callback] - Provide callback for async method (optional).
 *
 * @returns {object|function}
 */
module.exports.parse = function () {
    let xml, options = {}, callback;

    // Get arguments
    const args = Array.prototype.slice.call(arguments, 0);

    // xml argument should be string or buffer
    if (typeof args[0] === 'string' ||
        (isObject(args[0]) && args[0].constructor && args[0].constructor.name === 'Buffer')
    ) {
        xml = args.shift();
    } else {
        throw new Error('XML needs to be a string or a buffer.');
    }

    // options argument should be any object
    if (isObject(args[0])) {
        options = args.shift();
    }

    /*
     * Parse options
     */

    // `empty_tag_value` can be anything including `undefined`, but not being defined uses default
    if (!options.hasOwnProperty('empty_tag_value')) {
        options.empty_tag_value = DEFAULT_OPTIONS.empty_tag_value;
    }

    // Parse numbers
    if (typeof options.parse_int_numbers !== 'boolean') {
        options.parse_int_numbers = DEFAULT_OPTIONS.parse_int_numbers;
    }

    // Parse numbers
    if (typeof options.parse_float_numbers !== 'boolean') {
        options.parse_float_numbers = DEFAULT_OPTIONS.parse_float_numbers;
    }

    // Skip these tags for a speedup
    if (typeof options.skip_parse_when_begins_with !== 'string') {
        options.skip_parse_when_begins_with = DEFAULT_OPTIONS.skip_parse_when_begins_with;
    }

    // Sync
    return native.parse(xml, options);
};


const sampleXML = `<root>
   <!-- root comment -->
   <!-- another root comment -->
   <listing>
      <!-- my comment listing -->
      <seller_info>
         <!-- wow working comment -->
         <seller_name></seller_name>
         <seller_rating>new </seller_rating>
      </seller_info>
      <payment_types>Accepts Credit Cards (MC, VISA)
      </payment_types>
      <shipping_info>* Buyer Pays Shipping
         * Seller Ships on Payment
      </shipping_info>
      <buyer_protection_info> Standard Protection Coverage
      </buyer_protection_info>
      <auction_info>
         <current_bid>$310.00 </current_bid>
         <time_left>4 days </time_left>
         <high_bidder>
            <bidder_name>mike_and_colleen </bidder_name>
            <bidder_rating>1 </bidder_rating>
         </high_bidder>
         <num_items>5 </num_items>
         <num_bids>27 </num_bids>
         <started_at>$10.00 </started_at>
         <bid_increment>$5.00 </bid_increment>
         <location>Costa Meca, CA </location>
         <opened>Nov 27 00:24 PST </opened>
         <closed>Dec 02 10:24 PST </closed>
         <id_num>45519743 </id_num>
         <notes> Seller can close auction early.
            * Auction may get automatically extended </notes>
      </auction_info>
      <bid_history>
         <highest_bid_amount>$310.00
         </highest_bid_amount>
         <quantity>1 </quantity>
      </bid_history>
      <item_info>
         <memory>128MB RDRAM </memory>
         <hard_drive>
            40GB Ultra ATA Hard Drive (7200RPM)</hard_drive>
         <cpu>Pentium III </cpu>
         <brand>Dell Dimension 8100 Series </brand>
         <description>Dell's NEW
            Dimension features
            the Intel
            Pentium 4
            Processor! With
            leading edge
            performance and a
            brand new
            computing
            architecture, this
            system is designed
            for speed and power
            so you can enjoy the
            latest in audio,
            video, and Internet
            technologies.
         </description>
      </item_info>
   </listing>

   <listing>
      <seller_info>
         <seller_name>webaxion </seller_name>
         <seller_rating>31 </seller_rating>
      </seller_info>
      <payment_types> Accepts Yahoo! PayDirect
         * Accepts Personal Checks
         * Accepts Cashiers Checks and Money
         Orders
         * Accepts Credit Cards (MC, VISA)
      </payment_types>
      <shipping_info>Buyer Pays Shipping
         * Seller Ships on Payment
      </shipping_info>
      <buyer_protection_info> Standard Protection Coverage
      </buyer_protection_info>
      <auction_info>
         <current_bid>$53.50 </current_bid>
         <time_left>1 day </time_left>
         <high_bidder>
            <bidder_name>eldrdge1 </bidder_name>
            <bidder_rating>new </bidder_rating>
         </high_bidder>
         <num_items>1 </num_items>
         <num_bids> 4 </num_bids>
         <started_at>$20.00 </started_at>
         <bid_increment>$2.50 </bid_increment>
         <location>Charlotte, NC </location>
         <opened>Nov 23 05:57
            PST </opened>
         <closed>Nov 29 05:57
            PST </closed>
         <id_num>45245937 </id_num>
         <notes>Seller can close auction early.
            * Auction does not get automatically
            extended. </notes>
      </auction_info>
      <bid_history>
         <highest_bid_amount>
         </highest_bid_amount>
         <quantity> </quantity>
      </bid_history>
      <item_info>
         <memory> </memory>
         <hard_drive> </hard_drive>
         <cpu> </cpu>
         <brand> </brand>
         <description> Visioneer Strobe Pro NT integrates the most advanced paper management
            software
            with our unique compact sheet fed color scanner. The result is the ideal solution for
            streamlining information that makes it easy to find what you're looking for- even if you
            don't remember where you put it. With our Paper-driven? technology, you just feed in
            your color or black and white documents or images; Visioneer Strobe Pro NT
            automatically launches the PaperPort Deluxe software, and places your documents and
            images on the PaperPort desktop. and images on the PaperPort desktop.
         </description>
      </item_info>
   </listing>
</root>`;

console.time("fxml")
const res = module.exports.parse(sampleXML);
console.timeEnd("fxml");
console.log(res);
console.log(res.listing[0].seller_info);
